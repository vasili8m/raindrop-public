import { useCallback, useMemo, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Error from 'next/error'
import { parseQueryParams } from '~modules/format/url'
import Api from '~api'
import { getHTML } from '~pages/api/oembed/collection'
import { copyText } from '~modules/browser'
import links from '~config/links'
import { EmbedRedirect } from '~co/raindrops/routing'

import Page from '~co/page'
import Button, { Share, Buttons } from '~co/button'
import Icon from '~co/icon'
import Path from '~co/raindrops/path'
import Toolbar from '~co/layout/toolbar'
import Form, { Textarea, Label, Checkbox, Select, Input, Fields } from '~co/form'

export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { id, user_name } }) {
	const [ collection, user ] = await Promise.all([
		Api.collection.get(id),
		Api.user.getByName(user_name)
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
            user
		},
		revalidate: 3
	}
}

function PreviewDebounced({ html }) {
	const [load, setLoad] = useState(true)

	useEffect(()=>{
		setLoad(false)
		clearTimeout(window.__pdt)
		window.__pdt = setTimeout(() => {
			setLoad(true)
			window.__pdt = undefined
		}, 500)
	}, [html])

	if (!load)
		return null

	return <div dangerouslySetInnerHTML={{__html: html}} />
}

export default function EmbedCollectionScreen({ statusCode, collection, user }) {
	const router = useRouter()

	if (statusCode)
		return <Error statusCode={statusCode} />

	//canonical url
	const canonicalUrl = `${links.site.index}/${user.name}/${collection.slug}-${collection._id}`

	//form
	const value = useMemo(
		()=>{
			const options = parseQueryParams(router.query.options)

			return {
				...options,
				sort: options.sort || '',
				html: getHTML({ user, collection }, options)
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
			<Page.Wrap accentColor={collection.color}>
				<Head>
					<title>Share {collection.title}</title>
					<meta name='robots' content='noindex' />
				</Head>

				<Path 
					self
					collection={collection}
					user={user} />

				<Page.Header.Wrap>
					<Page.Header.Title>Share {collection.title}</Page.Header.Title>
					<Page.Header.Buttons>
						<Share 
							url={canonicalUrl}
							title={collection.title} />
					</Page.Header.Buttons>
				</Page.Header.Wrap>

				<Page.Subheader>
					<h2>Share this collection with your social community or embed to website or blog</h2>
				</Page.Subheader>

				<Page.Content>
					<Toolbar.Wrap>
						<Toolbar.Title>Export</Toolbar.Title>
					</Toolbar.Wrap>
					<Buttons>
						<Button
							href={`${links.site.index}/collection/${collection._id}/feed`}
							target='_blank'>
							<Icon name='rss' /> RSS
						</Button>
					</Buttons>

					<Toolbar.Wrap>
						<Toolbar.Title>Embed</Toolbar.Title>
						<Toolbar.Buttons>
							<Button 
								variant='flat'
								target='_blank'
								href={links.help.embed}>
								<Icon name='question' />
							</Button>

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

						<Label>Sort</Label>
						<div>
							<Select 
								name='sort'
								options={[{value:'', label: 'Custom (user specified)'}, {value:'-created', label: 'By date (newest)'}, {value: 'created', label: 'By date (oldest)'}, {value: 'title', label: 'By name (A-Z)'}, {value: '-title', label: 'By name (Z-A)'}]} />
						</div>

						<Label>Search</Label>
						<Input name='search' placeholder='By #tag, title, etc...' />

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
							<PreviewDebounced html={value.html} />
						</Fields>
					</Form>
				</Page.Content>

				<Page.Footer />
			</Page.Wrap>
		</EmbedRedirect>
	)
}