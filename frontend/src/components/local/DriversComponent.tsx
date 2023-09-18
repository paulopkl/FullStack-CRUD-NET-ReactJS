import { useQuery } from "react-query";
import axios from "axios";

import { TableComponent } from "./TableComponent";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon, EyeOpenIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { ArrowUpDown, Eye, FileSignature, Trash2 } from "lucide-react";

enum Car {
    Civic = 0,
    Kwid = 1,
    Mobi = 2,
    Fit = 3,
    Cobalt = 4,
    Onix = 5,
    Kicks = 6,
    Prius = 7,
    Up = 8
}

interface Driver {
  id: number;
  name: string;
  email: string;
  age: number;
  car: Car;
}

const fetchDrivers = async (): Promise<Driver[]> => {
  const response = await axios.get("http://localhost:3333/api/drivers");
  
  return response.data;
};

const DriversComponent: React.FC = () => {

  const { isLoading, isError, error, data: drivers } = useQuery<Driver[], Error>("drivers", fetchDrivers);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const columns: ColumnDef<Driver>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={table.getIsAllPageRowsSelected()}
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-bold"            
            >
                Motorista
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-bold"
            >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
    },
    {
      accessorKey: "age",
      header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-bold"
            >
                Idade
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
    },
    {
      accessorKey: "car",
      header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-bold"
            >
                Carro
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
      },
      cell: ({ row }) => {
        const val = Car[parseInt(row.getValue("car"))];

        return <div className="">{val}</div>
      }
    },
    {
        id: "actions",
        enableHiding: false,
        // header: "Ações",
        cell: ({ row }) => {
        //   const payment = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuItem
                    className="cursor-pointer"
                    // onClick={() => navigator.clipboard.writeText(String(payment.id))}
                    onClick={() => {}}
                >
                    <FileSignature className="w-5 h-5 mr-2" />
                    Editar motorista
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                    <Eye className="w-5 h-5 mr-2" />
                    Visualizar motorista
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                    <Trash2 className="w-5 h-5 mr-2" />
                    Deletar motorista
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
    }
  ]

  return (
      <div>
        <h1 className="text-3xl font-bold underline my-10">Catálogo para controle de motoristas cadastrados</h1>
        <TableComponent
            data={drivers}
            columns={columns}
        />
      </div>
  )
}

export { DriversComponent }
