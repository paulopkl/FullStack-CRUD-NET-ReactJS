import { useQuery } from "react-query";
import axios from "axios";

import { TableComponent } from "./TableComponent";
import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ArrowUpDown, Eye, FileSignature, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Car, Driver } from "@/share/interfaces";
import { ModalComponent } from "./ModalComponent";

const fetchDrivers = async (): Promise<Driver[]> => {
    const response = await axios.get("http://localhost:3333/api/drivers");

    return response.data;
};

const DriversComponent: React.FC = () => {
    const navigate = useNavigate();

    const {
        isLoading,
        isError,
        error,
        data: drivers,
    } = useQuery<Driver[], Error>("drivers", fetchDrivers);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const removeDriver = async (driverId: number) => {
        const url = `${import.meta.env.VITE_API_URL}/api/drivers/${driverId}`;

        const { data } = await axios.delete(url);

        alert(data.message);
    };

    const columns: ColumnDef<Driver>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="font-bold"
                    >
                        Motorista
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "email",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="font-bold"
                    >
                        Email
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "age",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="font-bold"
                    >
                        Idade
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "car",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                        className="font-bold"
                    >
                        Carro
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const val = Car[parseInt(row.getValue("car"))];

                return <div className="">{val}</div>;
            },
        },
        {
            id: "actions",
            enableHiding: false,
            header: "Ações",
            cell: ({ row }) => {
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
                                onClick={() => {
                                    navigate(
                                        `/update-driver/${row.original.id}`
                                    );
                                }}
                            >
                                <FileSignature className="w-5 h-5 mr-2" />
                                Editar motorista
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                    navigate(`/view-driver/${row.original.id}`);
                                }}
                            >
                                <Eye className="w-5 h-5 mr-2" />
                                Visualizar motorista
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <ModalComponent
                                triggerButton={
                                    <div className="relative flex select-none items-center rounded-sm px-2 py-1.5 md:hover:bg-accent text-sm outline-none cursor-pointer">
                                        <Trash2 className="w-5 h-5 mr-2" />
                                        Deletar motorista
                                    </div>
                                }
                                closeButton={
                                    <Button type="button">Voltar</Button>
                                }
                                confirmButton={
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() =>
                                            removeDriver(row.original.id)
                                        }
                                    >
                                        Confirmar
                                    </Button>
                                }
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return (
        <div>
            <h1 className="text-4xl font-bold mt-10">Sistema de Gestão</h1>
            <h2 className="text-xl font-light mt-4 mb-10">
                Gerêncie o catálogo de motoristas cadastrados
            </h2>
            <TableComponent data={drivers} columns={columns} />
        </div>
    );
};

export { DriversComponent };
