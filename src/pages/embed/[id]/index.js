import Page from '~co/page'
import Api from '~api'

import Button from '~co/button'
import Icon, { Image } from '~co/icon'
import CollectionAuthor from '~co/collections/author'
import Raindrops from '~co/raindrops/listing'

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { id, query } }) {
	const [ collection, raindrops ] = await Promise.all([
		Api.collection.get(id),
		Api.raindrops.get(id, query)
	])

	if (!collection)
		return { notFound: true }

	const user = await Api.user.get(collection.user.$id)

	return {
		props: {
			collection,
			raindrops,
			user
		},
		revalidate: 3
	}
}

export default function Home({ collection, raindrops, user }) {
	return (
		<Page.Wrap full>
			<Page.Header>
				<Page.Header.Title>
					<h1>
						{!!collection.cover?.length && (
							<Image 
								src={collection.cover[0]}
								size='large' />
						)}

						{collection.title}
					</h1>
				</Page.Header.Title>

				<Page.Header.Buttons>
					<Button 
						variant='ghost'
						href={`/${collection.slug}-${collection._id}/embed`}
						target='_blank'>
						<Icon name='arrow-right-up' />
					</Button>
				</Page.Header.Buttons>
			</Page.Header>

			<Page.Description>
				<CollectionAuthor
					collection={collection}
					user={user} />
			</Page.Description>

			<Page.Content>
				<Raindrops 
					collection={collection}
					items={raindrops.items} />

				<Button 
					block
					size='large'
					href={`/${collection.slug}-${collection._id}`}
					target='_blank'>
					Show more…
				</Button>
			</Page.Content>
		</Page.Wrap>
	)
}