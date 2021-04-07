export async function getStaticPaths() { return { paths: [], fallback: 'blocking' } }

export async function getStaticProps({ params: { name } }) {
    return {
		props: {
			name
		},
		revalidate: 3
	}
}

export default function UserPage({ name }) {
    return <b>user {name}</b>
}