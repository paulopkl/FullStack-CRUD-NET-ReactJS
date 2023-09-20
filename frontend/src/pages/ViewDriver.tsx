import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Driver } from "@/share/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { HomeIcon, PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import z from "zod";

const formSchema = z.object({
    name: z.string().min(3, {
        message: "Nome do motorista precisa ter no mínimo 3 caracteres.",
    }),
    email: z.string().email("Precisa ser um email válido"),
    age: z
        .number({ description: "Precisa ser um número", coerce: true })
        .int("Valor precisa ser um número inteiro")
        .gte(16, "Idade precisa ser maior que 16 anos")
        .lte(100, "idade precisa ser menor que 100 anos"),
    car: z
        .string()
        .min(1, { message: "Deve selecionar ao menos um modelo de carro" }),
});

const getDriverById = async (driverId: number): Promise<Driver> => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/drivers/${driverId}`
    );

    return response.data;
};

const ViewDriverPage: React.FC = () => {
    const params = useParams();

    const [disability, setDisability] = useState({
        name: true,
        email: true,
        age: true,
        car: true,
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            age: 0,
            car: "",
        },
    });

    useEffect(() => {
        (async () => {
            const res = await getDriverById(Number(params.driverId));
            form.setValue("name", res.name);
            form.setValue("email", res.email);
            form.setValue("age", res.age);
            form.setValue("car", String(res.car));
        })();
    }, []);

    async function patchDriver(value: any) {
        const url = `${import.meta.env.VITE_API_URL}/api/drivers/${
            params.driverId
        }`;

        const { data, status } = await axios.patch(url, value);

        if (status === 200) {
            alert(data.message);
        }
    }

    async function onChangeField(
        field: "name" | "age" | "email" | "car",
        value: string | number
    ) {
        console.log(disability[field]);

        if (!disability[field]) {
            setDisability((values) => ({ ...values, [field]: !values[field] }));

            await patchDriver({ [field]: value });
        } else {
            setDisability((values) => ({ ...values, [field]: !values[field] }));
        }
    }

    return (
        <div className="mx-10 my-6">
            <div className="flex items-center gap-5 mb-10">
                <Link to="/">
                    <HomeIcon className="cursor-pointer filter hover:invert-[30%]" />
                </Link>
                <ModeToggle />
            </div>
            <Form {...form}>
                <form
                    // onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        disabled={disability.name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Motorista</FormLabel>
                                <div className="flex gap-5">
                                    <FormControl>
                                        <Input
                                            placeholder="Nome do motorista"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <Button
                                            type="button"
                                            className="px-2"
                                            onClick={() =>
                                                onChangeField(
                                                    "name",
                                                    field.value
                                                )
                                            }
                                            // onClick={() =>
                                            //     setDisability((value) => ({
                                            //         ...value,
                                            //         name: !value.name,
                                            //     }))
                                            // }
                                        >
                                            <PencilLine />
                                        </Button>
                                    </FormControl>
                                </div>
                                <FormDescription>
                                    Este é o nome do motorista.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        disabled={disability.email}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-Mail</FormLabel>
                                <div className="flex gap-5">
                                    <FormControl>
                                        <Input
                                            placeholder="Email do motorista"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <Button
                                            type="button"
                                            className="px-2"
                                            onClick={() =>
                                                onChangeField(
                                                    "email",
                                                    field.value
                                                )
                                            }
                                            // onClick={() =>
                                            //     setDisability((value) => ({
                                            //         ...value,
                                            //         email: !value.email,
                                            //     }))
                                            // }
                                        >
                                            <PencilLine />
                                        </Button>
                                    </FormControl>
                                </div>
                                <FormDescription>
                                    E-mail do motorista.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="age"
                        disabled={disability.age}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Idade</FormLabel>
                                <div className="flex gap-5">
                                    <FormControl>
                                        <Input
                                            placeholder="Idade do motorista"
                                            type="number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <Button
                                            type="button"
                                            className="px-2"
                                            onClick={() =>
                                                onChangeField(
                                                    "age",
                                                    field.value
                                                )
                                            }
                                            // setDisability((value) => ({
                                            //     ...value,
                                            //     age: !value.age,
                                            // }))
                                        >
                                            <PencilLine />
                                        </Button>
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="car"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Carro</FormLabel>
                                <div className="flex gap-5">
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                            disabled={disability.car}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione o modelo do carro" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {[
                                                        "Civic",
                                                        "Kwid",
                                                        "Mobi",
                                                        "Fit",
                                                        "Cobalt",
                                                        "Onix",
                                                        "Kicks",
                                                        "Prius",
                                                        "Up",
                                                    ].map((car, index) => (
                                                        <SelectItem
                                                            key={index}
                                                            value={String(
                                                                index
                                                            )}
                                                            className="cursor-pointer"
                                                        >
                                                            {car}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormControl>
                                        <Button
                                            type="button"
                                            className="px-2"
                                            onClick={() =>
                                                onChangeField(
                                                    "car",
                                                    field.value
                                                )
                                            }
                                            // onClick={() =>
                                            //     setDisability((value) => ({
                                            //         ...value,
                                            //         car: !value.car,
                                            //     }))
                                            // }
                                        >
                                            <PencilLine />
                                        </Button>
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
};

export { ViewDriverPage };
