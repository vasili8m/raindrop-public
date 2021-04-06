import Head from 'next/head'
import Page from '~co/page'
import Api from '~api'

import Button from '~co/button'
import Icon, { Logo, Image, Avatar } from '~co/icon'
import Info from '~co/helpers/info'
import Badge from '~co/helpers/badge'
import Bookmarks from '~co/bookmark/listing'

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { id } }) {
	const [ collection, raindrops ] = await Promise.all([
		Api.collection.get(id),
		Api.raindrops.get(id)
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
		revalidate: 1,
	}
}

export default function Home({ collection, raindrops, user }) {
	return (
		<Page.Wrap full={collection.view == 'grid' || collection.view == 'masonry'}>
			<Head>
				<title>{collection.title}</title>
			</Head>

			<Page.Header>
				{!!collection.cover?.length && (
					<Image 
						src={collection.cover[0]}
						size='large' />
				)}

				<h1>{collection.title}</h1>

				<Button variant='flat' href={`/${collection.slug}-${collection._id}/embed`}>
					<Icon name='upload-2' />
				</Button>

				<Button variant='flat' href={`/${collection.slug}-${collection._id}/search`}>
					<Icon name='search' />
				</Button>

				<Button variant='flat' href='https://raindrop.io'>
					<Logo />
				</Button>
			</Page.Header>

			<Page.Description>
				{!!collection.description && (
					<h2>{collection.description}</h2>
				)}
				
				<Info>
					<Button variant='flat' size='small'>
						<Avatar 
							src="https://avatars.githubusercontent.com/u/1203812?v=4" />
						
						{user.name}

						{!!user.pro && (
							<Badge variant='disabled'>Pro</Badge>
						)}
					</Button>

					<span>{collection.count} bookmarks</span>
					<span>last update {collection.lastAction}</span>
				</Info>
			</Page.Description>

			<Page.Content>
				<Bookmarks 
					view={collection.view}
					items={raindrops} />
			</Page.Content>

			<Page.Footer />
		</Page.Wrap>
	)
}