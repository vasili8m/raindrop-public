import Error from 'next/error'
import Page from '~co/page'
import Api from '~api'
import { RAINDROPS_PER_PAGE } from '~config/raindrops'

import Link from 'next/link'
import Icon from '~co/icon'
import Raindrops from '~co/raindrops/listing'
import Field from '~co/raindrops/search/field'

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { id, user_name, query={} } }) {
	query.sort = query.sort || (query.search?.length ? 'score' : '-created')
	query.perpage = RAINDROPS_PER_PAGE

	const [ collection, raindrops, user ] = await Promise.all([
		Api.collection.get(id),
		Api.raindrops.get(id, query),
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
			query,
		},
		revalidate: 3
	}
}

export default function SearchScreen({ statusCode, collection, raindrops, user, query }) {
	if (statusCode)
		return <Error statusCode={statusCode} />
		
	return (
		<Page.Wrap
			full={collection.view == 'grid' || collection.view == 'masonry'}
			accentColor={collection.color}>
			<Page.Header.Wrap>
				<Page.Header.Title>
					<h2>
						<Icon name='arrow-left' size='small' />

						<Link href={`/${user.name}/${collection.slug}-${collection._id}`}>
							<a>
								
								{collection.title}
							</a>
						</Link>
					</h2>

					<Field 
						query={query}
						collection={collection}
						user={user} />
				</Page.Header.Title>
			</Page.Header.Wrap>

			<Page.Content>
				<Raindrops 
					collection={collection}
					items={raindrops.items}
					user={user} />

				<Page.Pagination 
					prefix={``}
					page={query.page}
					perpage={query.perpage}
					count={raindrops.count} />
			</Page.Content>

			<Page.Footer />
		</Page.Wrap>
	)
}