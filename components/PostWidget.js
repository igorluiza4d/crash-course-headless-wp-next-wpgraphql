import Link from "next/link"
import parse from 'html-react-parser';

export default function PostWidget ({ widget }){
    return (
        <div key={widget.id}>
          IGPR
          <strong>{widget.title}</strong>
          {parse(widget.html)}
        </div>
    )
}