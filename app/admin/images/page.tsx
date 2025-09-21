import Link from "next/link";
import { db } from "@/lib/data";
import { ImageUpload } from "@/components/forms/ImageUpload";
import { Card, Section, Grid, Badge } from "@/components/ui";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

export const dynamic = "force-dynamic";

export default async function AdminImagesPage() {
  // This would typically fetch images from your storage service
  // For now, we'll show a placeholder structure
  
  const imageCategories = [
    {
      name: "Hero Images",
      count: 4,
      description: "Main carousel images for homepage",
      bucket: "images",
      folder: "hero"
    },
    {
      name: "Officials Photos",
      count: 12,
      description: "Profile photos of district officials",
      bucket: "images", 
      folder: "officials"
    },
    {
      name: "Team Photos",
      count: 8,
      description: "Team and player photos",
      bucket: "images",
      folder: "teams"
    },
    {
      name: "Event Photos",
      count: 25,
      description: "Tournament and event photos",
      bucket: "images",
      folder: "events"
    },
    {
      name: "Documents",
      count: 15,
      description: "PDFs and document attachments",
      bucket: "documents",
      folder: "uploads"
    }
  ];

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Image Management</h1>
        <Link
          href="/admin/images/upload"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Upload Images
        </Link>
      </div>

      {/* Image Upload Component */}
      <Section title="Upload New Image" className="mb-8">
        <div className="max-w-2xl">
          <ImageUpload
            onImageUpload={(result) => {
              // Handle successful upload
              console.log("Image uploaded:", result);
            }}
            bucket="images"
            folder="uploads"
          />
        </div>
      </Section>

      {/* Image Categories */}
      <Section title="Image Categories" className="mb-8">
        <Grid cols={3} gap="lg">
          {imageCategories.map((category) => (
            <Card key={category.name} className="hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-dark-gray">
                    {category.name}
                  </h3>
                  <Badge variant="secondary" size="sm">
                    {category.count} images
                  </Badge>
                </div>
                <p className="text-medium-gray text-sm mb-4">
                  {category.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-medium-gray">
                    {category.bucket}/{category.folder}
                  </span>
                  <Link
                    href={`/admin/images/category/${category.folder}`}
                    className="text-bright-red hover:text-red-700 font-medium text-sm hover:underline"
                  >
                    Manage →
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Recent Uploads */}
      <Section title="Recent Uploads" className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Placeholder for recent images */}
          {Array.from({ length: 12 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-square">
                <OptimizedImage
                  src={`https://picsum.photos/300/300?random=${index}`}
                  alt={`Sample image ${index + 1}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                  fallback="/placeholder-image.jpg"
                />
              </div>
              <div className="p-2">
                <p className="text-xs text-medium-gray truncate">
                  image-{index + 1}.jpg
                </p>
                <p className="text-xs text-medium-gray">
                  {Math.floor(Math.random() * 1000)}KB
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Image Optimization Stats */}
      <Section title="Optimization Statistics" className="mb-8">
        <Grid cols={4} gap="lg">
          <Card className="text-center p-6">
            <div className="text-2xl font-bold text-bright-red mb-2">64</div>
            <div className="text-sm text-medium-gray">Total Images</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-2xl font-bold text-orange mb-2">2.3MB</div>
            <div className="text-sm text-medium-gray">Total Size</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-2xl font-bold text-dark-gray mb-2">85%</div>
            <div className="text-sm text-medium-gray">Optimized</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-2xl font-bold text-medium-gray mb-2">12</div>
            <div className="text-sm text-medium-gray">Formats</div>
          </Card>
        </Grid>
      </Section>

      {/* CDN Information */}
      <Section title="CDN Configuration" className="mb-8">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-dark-gray mb-4">
              Supabase Storage & CDN
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-dark-gray mb-2">Storage Buckets</h4>
                <ul className="space-y-2 text-sm text-medium-gray">
                  <li>• <code className="bg-gray-100 px-2 py-1 rounded">images</code> - Image files</li>
                  <li>• <code className="bg-gray-100 px-2 py-1 rounded">documents</code> - PDF files</li>
                  <li>• <code className="bg-gray-100 px-2 py-1 rounded">uploads</code> - User uploads</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-dark-gray mb-2">Optimization Features</h4>
                <ul className="space-y-2 text-sm text-medium-gray">
                  <li>• Automatic WebP conversion</li>
                  <li>• Responsive image sizing</li>
                  <li>• Global CDN distribution</li>
                  <li>• Lazy loading support</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </Section>
    </section>
  );
}
