import Head from 'next/head'
import Error from 'next/error'
import Api from '~api'
import { RAINDROPS_PER_PAGE } from '~config/raindrops'
import find from 'lodash/find'

import Page from '~co/page'
import Button from '~co/button'
import Icon from '~co/icon'
import Raindrops from '~co/raindrops/listing'
import Field from '~co/search/field'
import Tags from '~co/search/tags'
import Sort from '~co/raindrops/sort'
import Path from '~co/raindrops/path'
import Toolbar from '~co/layout/toolbar'

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { id, user_name, options } }) {
	options = Object.fromEntries(new URLSearchParams(options))
	options.sort = options.sort || (options.search?.length ? 'score' : '-created')
	options.page = parseInt(options.page)
	options.perpage = RAINDROPS_PER_PAGE

	const [ collections, raindrops, user, filters={} ] = await Promise.all([
		Api.collections.getByUserName(user_name),
		Api.raindrops.get(id, options),
		Api.user.getByName(user_name),
		(!options.page ? Api.filters.get(id, options) : undefined)
	])

	const collection = find(collections, ['_id', parseInt(id)])

	//notFound: true doesn't refresh cached pages :( so instead do this:
	if (!collection || !user)
		return {
			props: {
				statusCode: 404
			},
			revalidate: 10
		}

	return {
		props: {
			collection,
			collections,
			raindrops,
			filters,
			user,
			options
		},
		revalidate: 3
	}
}

export default function SearchScreen({ statusCode, collection, collections, raindrops, filters, user, options }) {
	if (statusCode)
		return <Error statusCode={statusCode} />
		
	return (
		<Page.Wrap
			wide={collection.view == 'grid' || collection.view == 'masonry'}
			accentColor={collection.color}>
			<Head>
				<title>Search {collection.title}</title>
				{!!collection.cover?.length && (
					<link rel='icon' type='image/png' href={collection.cover[0]} />
				)}

				<meta name='robots' content='noindex' />
			</Head>

			<Path 
				self
				collection={collection}
				collections={collections}
				user={user} />

			<Page.Header.Wrap>
				<Field placeholder={`Search ${collection.title}`} />

				<Page.Header.Buttons style={{flex: 0}}>
					<Button 
						variant='flat' 
						href={`/${user.name}/${collection.slug}-${collection._id}/share/`+new URLSearchParams(options)}
						title='Export & Share'
						prefetch={false}>
						<Icon name='upload-2' />
					</Button>
				</Page.Header.Buttons>
			</Page.Header.Wrap>

			<Page.Subheader>
				<Tags
					{...filters} />
			</Page.Subheader>

			<Page.Content>
				<Toolbar.Wrap>
					<Toolbar.Title>
						{raindrops.items.length ? 'Found bookmarks' : 'Nothing found'}
					</Toolbar.Title>

					{!!raindrops.items.length && (
						<Toolbar.Buttons>
							<Sort options={options} />
						</Toolbar.Buttons>
					)}
				</Toolbar.Wrap>

				<Raindrops 
					collection={collection}
					collections={collections}
					items={raindrops.items}
					user={user} />
			</Page.Content>

			<Page.Pagination 
				page={options.page}
				perpage={options.perpage}
				count={raindrops.count}
				force={raindrops.items.length==options.perpage ? 'next' : true} />

			<Page.Footer />
		</Page.Wrap>
	)
}