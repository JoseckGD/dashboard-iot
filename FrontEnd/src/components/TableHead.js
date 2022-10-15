import { TableHeader } from "./TableHeader"

export const TableHead = ({ indexTable }) => {
   return (
      <thead>
         <tr>
            <TableHeader indexTable={indexTable} />
         </tr>
      </thead>
   )
}
