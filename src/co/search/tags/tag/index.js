import Button from '~co/button'
import { useTagHref } from '~co/search/hooks'

export default function SearchTag({ _id }) {
    const href = useTagHref(_id)

    return (
        <Button
            href={href}>
            #{_id}
        </Button>
    )
}