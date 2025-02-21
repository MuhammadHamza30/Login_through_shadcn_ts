import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DataTable(){

  
  const [ ApiDatas , setApiDatas ] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((res) => setApiDatas(res.slice(0, 20)));
  },[]);

  return(<>
                <Table>
                <TableCaption>A list of Data that i have fetch</TableCaption>
                <TableHeader>
                  <TableRow>
                  <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>UserId</TableHead>
                    <TableHead>title</TableHead>
                    <TableHead className="text-right">Complete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ApiDatas.map((Data) =>(
                    <TableRow key={Data.id}>
                      <TableCell className="font-medium">{Data.id}
                      </TableCell>
                      <TableCell className="font-medium">{Data.userId}
                      </TableCell>
                      <TableCell>{Data.title}</TableCell>
                      <TableCell>{Data.completed ? "yes" : "No"}</TableCell>
                      <TableCell className="text-right">
                      </TableCell>
                    </TableRow>
                  ) )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>Total Data</TableCell>
                    <TableCell className="text-right">{ApiDatas.length}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
  </>)

}