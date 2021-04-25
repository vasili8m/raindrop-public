import Error from 'next/error'
import Head from 'next/head'
import Api from '~api'

import Page from '~co/page'
import Icon, { Avatar } from '~co/icon'
import Button from '~co/button'
import Badge from '~co/badge'
import Collections from '~co/collections/listing'
import { useRoot } from '~co/collections/hooks' 

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { user_name } }) {
	const user = await Api.user.getByName(user_name)

	if (!user)
		return { props: { statusCode: 404 }, revalidate: 10 }

	const collections = await Api.collections.get(user._id)

	if (!collections?.length)
		return { props: { statusCode: 404 }, revalidate: 10 }

    return {
		props: {
			user,
			collections
		},
		revalidate: 3
	}
}

export default function EmbedUser({ statusCode, user, collections }) {
	if (statusCode)
		return <Error statusCode={statusCode} />

	const root = useRoot(collections)

    return (
		<Page.Wrap 
            embed
            wide>
			<Head>
                <meta name='robots' content='noindex' />
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
						href={`/${user.name}`}
						target='_blank'>
						Show all
						<Icon name='arrow-right-up' />
					</Button>
				</Page.Header.Buttons>
			</Page.Header.Wrap>

			<Page.Content>
				<Collections 
					items={root}
					user={user} />
			</Page.Content>
		</Page.Wrap>
	)
}