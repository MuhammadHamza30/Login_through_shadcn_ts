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

interface ApiData {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export function DataTable() {
  const [ApiDatas, setApiDatas] = useState<ApiData[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((res: ApiData[]) => setApiDatas(res.slice(0, 20))) // Type the response
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Table>
      <TableCaption>A list of Data that I have fetched</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>UserId</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Complete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ApiDatas.map((Data) => (
          <TableRow key={Data.id}>
            <TableCell className="font-medium">{Data.id}</TableCell>
            <TableCell className="font-medium">{Data.userId}</TableCell>
            <TableCell>{Data.title}</TableCell>
            <TableCell>{Data.completed ? "Yes" : "No"}</TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Data</TableCell>
          <TableCell className="text-right">{ApiDatas.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
