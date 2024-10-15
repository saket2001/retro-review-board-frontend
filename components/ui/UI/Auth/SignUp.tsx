import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/Components/ui/button";


export default function SignUpForm(){
    return (
        <Card className="bg-gray-100">
        <CardHeader>
          <CardDescription>
            Add your details here. After saving, you'll be headed to the board.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="fullname">Full Name</Label>
            <Input id="fullname" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="password" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    );
}