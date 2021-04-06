import Head from 'next/head'
import Page from '~co/page'
import Link from 'next/link'
import Api from '~api'

import Button from '~co/button'
import Icon, { Logo, Image } from '~co/icon'
import CollectionAuthor from '~co/collections/author'
import Raindrops from '~co/raindrops/listing'
import Childrens from '~co/collections/childrens'

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { id, query } }) {
	const [ collection, raindrops ] = await Promise.all([
		Api.collection.get(id),
		Api.raindrops.get(id, query)
	])

	if (!collection)
		return { notFound: true }

	const user = await Api.user.get(collection.user.$id)
	const [ parent, childrens ] = await Promise.all([
		Api.collection.get(collection.parent?.$id),
		Api.collection.childrens(user._id, collection._id)
	])

	return {
		props: {
			collection,
			raindrops,
			user,
			parent,
			childrens
		},
		revalidate: 3
	}
}

export default function Home({ collection, raindrops, user, parent, childrens }) {
	return (
		<Page.Wrap full={collection.view == 'grid' || collection.view == 'masonry'}>
			<Head>
				<link rel='canonical' href={`https://${user.name}.raindrop.io/${collection.slug}-${collection._id}`} />

				<title>{collection.title}</title>
				<meta name='twitter:title' content={collection.title} />
				<meta name='og:title' content={collection.title} />

				<meta name='description' content={collection.description} />
				<meta name='twitter:description' content={collection.description} />
				<meta name='og:description' content={collection.description} />

				<meta name='twitter:label1' content='Created by' />
				<meta name='twitter:data1' content={user.name} />

				{!!collection.cover?.length && (
					<>
						<link rel='icon' type='image/png' href={collection.cover[0]} />
						<meta name='twitter:image' content={collection.cover[0]} />
						<meta name='og:image' content={collection.cover[0]} />
					</>
				)}
			</Head>

			<Page.Header>
				{!!parent && (<>
					<Link href={`/${parent.slug}-${parent._id}`}>
						<a>
							<h2>
								{!!parent.cover?.length && (
									<Image 
										src={parent.cover[0]}
										size='large' />
								)}

								{parent.title}
							</h2>
						</a>
					</Link>
					

					<span data-separator />
				</>)}

				<h1>
					{!!collection.cover?.length && (
						<Image 
							src={collection.cover[0]}
							size='large' />
					)}

					{collection.title}
				</h1>

				<Button 
					variant='flat' 
					href={`/${collection.slug}-${collection._id}/export`}
					title='Export & Share'>
					<Icon name='upload-2' />
				</Button>

				<Button 
					variant='flat' 
					href={`/${collection.slug}-${collection._id}/search`}
					title='Search'>
					<Icon name='search' />
				</Button>

				<Button 
					variant='flat' 
					href='https://raindrop.io'
					title='Raindrop.io'>
					<Logo />
				</Button>
			</Page.Header>

			<Page.Description>
				<CollectionAuthor
					collection={collection}
					user={user} />
			</Page.Description>

			<Page.Content>
				<Childrens 
					items={childrens} />

				<Raindrops 
					view={collection.view}
					items={raindrops} />
			</Page.Content>

			<Page.Footer />
		</Page.Wrap>
	)
}