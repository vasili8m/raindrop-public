import Head from 'next/head'
import Error from 'next/error'
import Api from '~api'
import { RAINDROPS_PER_PAGE } from '~config/raindrops'

import Page from '~co/page'
import Link from 'next/link'
import Icon from '~co/icon'
import Raindrops from '~co/raindrops/listing'
import Field from '~co/raindrops/search/field'

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { id, user_name, options } }) {
	options = Object.fromEntries(new URLSearchParams(options))
	options.sort = options.sort || (options.search?.length ? 'score' : '-created')
	options.perpage = RAINDROPS_PER_PAGE

	const [ collection, raindrops, user ] = await Promise.all([
		Api.collection.get(id),
		Api.raindrops.get(id, options),
		Api.user.get(user_name)
	])

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
			raindrops,
			user,
			options
		},
		revalidate: 3
	}
}

export default function SearchScreen({ statusCode, collection, raindrops, user, options }) {
	if (statusCode)
		return <Error statusCode={statusCode} />
		
	return (
		<Page.Wrap
			full={collection.view == 'grid' || collection.view == 'masonry'}
			accentColor={collection.color}>
			<Head>
				<title>Search {collection.title}</title>
				{!!collection.cover?.length && (
					<link rel='icon' type='image/png' href={collection.cover[0]} />
				)}
			</Head>

			<Page.Header.Wrap>
				<Page.Header.Title>
					<h2>
						<Icon name='arrow-left' size='small' />

						<Link href={`/${user.name}/${collection.slug}-${collection._id}`}>
							<a>{collection.title}</a>
						</Link>
					</h2>

					<Field />
				</Page.Header.Title>
			</Page.Header.Wrap>

			<Page.Content>
				<Raindrops 
					collection={collection}
					items={raindrops.items}
					user={user} />
			</Page.Content>

			<Page.Pagination 
				page={options.page}
				perpage={options.perpage}
				count={raindrops.count} />

			<Page.Footer />
		</Page.Wrap>
	)
}