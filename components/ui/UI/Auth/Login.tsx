import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/Components/ui/button";


export default function LoginForm(){
    return (
        <Card className="bg-gray-100">
        <CardHeader>
          <CardTitle>Welcome Back, User!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input id="username" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="Password">Password</Label>
            <Input type="password" id="Password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    );
}