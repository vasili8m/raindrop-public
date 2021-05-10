import Error from 'next/error'
import Head from 'next/head'
import Api from '~api'
import links from '~config/links'
import { EmbedRedirect } from '~co/user/routing'

import Page from '~co/page'
import Icon, { Logo, Avatar } from '~co/icon'
import Button from '~co/button'
import Info from '~co/layout/info'
import { ShortDate } from '~modules/format/date'
import Badge from '~co/badge'
import Collections from '~co/collections/listing'
import { useRoot } from '~co/collections/hooks' 
import Toolbar from '~co/layout/toolbar'

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { user_name } }) {
	const [ user, collections ] = await Promise.all([
		Api.user.getByName(user_name),
		Api.collections.getByUserName(user_name)
	])

	if (!user || !collections?.length)
		return { props: { statusCode: 404 }, revalidate: 10 }

    return {
		props: {
			user,
			collections
		},
		revalidate: 3
	}
}

export default function UserPage({ statusCode, user, collections }) {
	if (statusCode)
		return <Error statusCode={statusCode} />

	const root = useRoot(collections)

    return (
		<EmbedRedirect>
			<Page.Wrap wide>
				<Head>
					<link rel='canonical' href={`${links.site.index}/${user.name}`} />

					<title>{user.name}</title>
					<meta name='twitter:title' content={user.name} />
					<meta name='og:title' content={user.name} />

					{!!user.avatar && (
						<>
							<link rel='icon' type='image/png' href={user.avatar} />
							<meta name='twitter:image' content={user.avatar} />
							<meta name='og:image' content={user.avatar} />
						</>
					)}
				</Head>

				<Page.Header.Wrap>
					{!!user.avatar && (
						<Page.Header.Icon>
							<Avatar 
								src={user.avatar}
								alt={user.name}
								size='large' />
						</Page.Header.Icon>
					)}

					<Page.Header.Title>
						{user.name}
					</Page.Header.Title>

					{!!user.pro && (
						<Badge variant='disabled'>Pro</Badge>
					)}

					<Page.Header.Buttons>
						<Button 
							href={`/${user.name}/share/me`}
							bold>
							<Icon name='code' />
							Embed
						</Button>

						<Button 
							variant='flat' 
							href='https://raindrop.io'
							title='Raindrop.io'>
							<Logo />
						</Button>
					</Page.Header.Buttons>
				</Page.Header.Wrap>

				<Page.Subheader>
					<Info>
						<span>Member since <ShortDate date={user.registered} /></span>

						{!!user.twitter?.screen_name && (
							<Button
								href={`https://twitter.com/${user.twitter?.screen_name}`}
								target='_blank'
								variant='flat'
								title='Twitter'>
								<Icon 
									name='twitter'
									variant='fill' />
							</Button>
						)}

						{!!user.facebook?.screen_name && (
							<Button
								href={`https://facebook.com/${user.facebook?.screen_name}`}
								target='_blank'
								variant='flat'
								title='Facebook'>
								<Icon 
									name='facebook-circle'
									variant='fill' />
							</Button>
						)}
					</Info>
				</Page.Subheader>

				<Page.Content>
					<Toolbar.Wrap>
						<Toolbar.Title>
							{root.length} public collections
						</Toolbar.Title>
					</Toolbar.Wrap>

					<Collections 
						items={root}
						user={user} />
				</Page.Content>

				<Page.Footer />
			</Page.Wrap>
		</EmbedRedirect>
	)
}