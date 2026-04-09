import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const Profile = () => (
  <AppLayout title="Profile">
    <div className="max-w-2xl space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-base">Personal Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">Change Avatar</Button>
          </div>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input defaultValue="Doe" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Email</Label>
              <Input defaultValue="john@company.com" type="email" />
            </div>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Change Password</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input type="password" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input type="password" />
            </div>
          </div>
          <Button variant="outline">Update Password</Button>
        </CardContent>
      </Card>
    </div>
  </AppLayout>
);

export default Profile;
