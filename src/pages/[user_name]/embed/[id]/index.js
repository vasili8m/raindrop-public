import Error from 'next/error'
import Page from '~co/page'
import Api from '~api'

import Button from '~co/button'
import Icon, { Image } from '~co/icon'
import CollectionAuthor from '~co/collections/author'
import Raindrops from '~co/raindrops/listing'

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { id, user_name, query } }) {
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
			user
		},
		revalidate: 3
	}
}

export default function EmbedScreen({ statusCode, collection, raindrops, user }) {
	if (statusCode)
		return <Error statusCode={statusCode} />
		
	return (
		<Page.Wrap 
			full
			accentColor={collection.color}>
			<Page.Header.Wrap>
				<Page.Header.Title>
					<h1>
						{!!collection.cover?.length && (
							<Image 
								src={collection.cover[0]}
								alt={collection.title}
								size='large' />
						)}

						{collection.title}
					</h1>
				</Page.Header.Title>

				<Page.Header.Buttons>
					<Button 
						variant='ghost'
						href={`/${user.name}/${collection.slug}-${collection._id}`}
						target='_blank'>
						<Icon name='arrow-right-up' />
					</Button>
				</Page.Header.Buttons>
			</Page.Header.Wrap>

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
					href={`/${user.name}/${collection.slug}-${collection._id}`}
					prefetch={false}
					target='_blank'>
					Show more…
				</Button>
			</Page.Content>
		</Page.Wrap>
	)
}