import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { Badge } from "@/components/ui/Badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/NavigationMenu";
import { ContactForm } from "@/components/forms/ContactForm";

export default function ComponentsDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white to-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-dark-gray">Sepak Takraw UI Components</h1>
          <p className="text-xl text-medium-gray max-w-3xl mx-auto">
            Beautiful, accessible components built with shadcn/ui and curved borders for a modern look.
          </p>
        </div>

        {/* Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-dark-gray text-center">Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="accent">Accent</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* Cards Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-dark-gray text-center">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-medium-gray">This is the card content area where you can put any content.</p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Another Card</CardTitle>
                <CardDescription>With different content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-medium-gray">Cards are perfect for displaying content in organized sections.</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Save</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature Card</CardTitle>
                <CardDescription>Highlighting key features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">New</Badge>
                    <span className="text-sm text-medium-gray">Feature</span>
                  </div>
                  <p className="text-medium-gray">This card shows how badges and other elements work together.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Form Elements Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-dark-gray text-center">Form Elements</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="demo-input">Input Field</Label>
                <Input id="demo-input" placeholder="Enter some text..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo-select">Select Field</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-textarea">Textarea</Label>
              <Textarea id="demo-textarea" placeholder="Enter a longer message..." />
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-dark-gray text-center">Badges</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="accent">Accent</Badge>
          </div>
        </section>

        {/* Navigation Menu Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-dark-gray text-center">Navigation Menu</h2>
          <div className="flex justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Documentation</h4>
                        <p className="text-sm text-medium-gray">Learn how to use our components</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Examples</h4>
                        <p className="text-sm text-medium-gray">See components in action</p>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="group inline-flex h-12 w-max items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-bright-red focus:bg-gray-100 focus:text-bright-red focus:outline-none">
                    Components
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="group inline-flex h-12 w-max items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-bright-red focus:bg-gray-100 focus:text-bright-red focus:outline-none">
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </section>

        {/* Dropdown Menu Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-dark-gray text-center">Dropdown Menu</h2>
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>

        {/* Dialog Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-dark-gray text-center">Dialog</h2>
          <div className="flex justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive">Delete Account</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-dark-gray text-center">Contact Form</h2>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
