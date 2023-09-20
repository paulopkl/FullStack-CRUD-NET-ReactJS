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
import { HomeIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
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

const UpdateDriverPage: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();

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

    async function updateDriver(values: any) {
        const url = `${import.meta.env.VITE_API_URL}/api/drivers/${
            params.driverId
        }`;

        const { data, status } = await axios.put(url, values);

        if (status === 200) {
            alert(data.message);

            navigate("/");
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await updateDriver(values);
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
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Motorista</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Nome do motorista"
                                        {...field}
                                    />
                                </FormControl>
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
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-Mail</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Email do motorista"
                                        {...field}
                                    />
                                </FormControl>
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
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Idade</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Idade do motorista"
                                        type="number"
                                        {...field}
                                    />
                                </FormControl>
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
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
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
                                                        value={String(index)}
                                                        className="cursor-pointer"
                                                    >
                                                        {car}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Salvar Alterações</Button>
                </form>
            </Form>
        </div>
    );
};

export { UpdateDriverPage };
