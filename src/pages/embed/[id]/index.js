export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true,
	}
}

export async function getStaticProps({ params }) {
	console.log(params)
	return {
		props: params,
		revalidate: 1,
	}
}

export default function Embed() {
    return (<b>embed</b>)
}