import { DriversComponent } from "@/components/local/DriversComponent";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
    return (
        <div className="mx-10 my-6">
            <ModeToggle />
            <DriversComponent />
            <Link to="/create-driver">
                <Button>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Criar novo motorista
                </Button>
            </Link>
        </div>
    );
};

export { HomePage };
