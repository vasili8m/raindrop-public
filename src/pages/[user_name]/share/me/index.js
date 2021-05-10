import { useCallback, useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Error from 'next/error'
import Api from '~api'
import { parseQueryParams } from '~modules/format/url'
import { getHTML } from '~pages/api/oembed/user'
import { copyText } from '~modules/browser'
import links from '~config/links'
import { EmbedRedirect } from '~co/user/routing'

import Page from '~co/page'
import Button, { Share } from '~co/button'
import Icon from '~co/icon'
import Path from '~co/raindrops/path'
import Toolbar from '~co/layout/toolbar'
import Form, { Textarea, Label, Checkbox, Fields, Select } from '~co/form'

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { user_name } }) {
	const user = await Api.user.getByName(user_name)

	//notFound: true doesn't refresh cached pages :( so instead do this:
	if (!user)
		return {
			props: {
				statusCode: 404
			},
			revalidate: 10
		}

	return {
		props: {
            user
		},
		revalidate: 3
	}
}

export default function EmbedUserScreen({ statusCode, user }) {
	const router = useRouter()

	if (statusCode)
		return <Error statusCode={statusCode} />

	//canonical url
	const canonicalUrl = `${links.site.index}/${user.name}`

	//form
	const value = useMemo(
		()=>{
			const options = parseQueryParams(router.query.options)

			return {
				...options,
				html: getHTML({ user }, options)
			}
		},
		[router.query.options]
	)

	const onChange = useCallback(value=>{
		let { html, ...options } = value

		for(const i in options)
			if (!options[i])
				delete options[i]

		router.replace({
			pathname: router.pathname.endsWith('[options]') ? router.pathname : `${router.pathname}/[options]`,
			query: {
                ...router.query,
                options: new URLSearchParams(options).toString()
            }
		}, undefined, { shallow: true })
	}, [])
		
	return (
		<EmbedRedirect>
			<Page.Wrap>
				<Head>
					<title>Embed {user.name}</title>
					<meta name='robots' content='noindex' />
				</Head>

				<Path user={user} />

				<Page.Header.Wrap>
					<Page.Header.Title>Embed User Profile</Page.Header.Title>
					<Page.Header.Buttons>
						<Share 
							url={canonicalUrl}
							title={user.name} />
					</Page.Header.Buttons>
				</Page.Header.Wrap>

				<Page.Subheader>
					<h2>Share your collections with social community or embed to website or blog</h2>
				</Page.Subheader>

				<Page.Content>
					<Toolbar.Wrap>
						<Toolbar.Title>Embed</Toolbar.Title>
						<Toolbar.Buttons>
							<Button
								variant='active'
								bold
								onClick={()=>copyText(value.html)}>
								<Icon name='file-copy' />
								Copy Code
							</Button>
						</Toolbar.Buttons>
					</Toolbar.Wrap>

					<Form 
						value={value}
						onChange={onChange}>
						<Label>Code</Label>
						<Textarea 
							name='html'
							autoFocus
							readOnly />

						<Label>Appearance</Label>
						<Fields>
							<div>
								<Select 
									name='theme'
									options={[{value:'', label: 'Light theme'}, {value: 'dark', label: 'Dark theme'}, {value: 'auto', label: 'Automatic theme (light or dark depending on user preferences)'}]} />
							</div>
							<Checkbox name='no-header'>Hide header</Checkbox>
						</Fields>

						<Label>Preview</Label>
						<Fields inset>
							<div dangerouslySetInnerHTML={{__html: value.html}} />
						</Fields>
					</Form>
				</Page.Content>

				<Page.Footer />
			</Page.Wrap>
		</EmbedRedirect>
	)
}