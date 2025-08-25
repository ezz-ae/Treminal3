
'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function StoragePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline">Decentralized Storage</h1>
       <p className="text-muted-foreground mb-6">Describe the file you want to upload to decentralized storage.</p>
       <div className="space-y-4 max-w-2xl">
          <Textarea 
            placeholder="e.g., 'Upload the metadata file for my NFT collection, collection-metadata.json, to IPFS and pin it for permanent storage.'"
            className="min-h-[150px]"
          />
          <Button>Upload</Button>
        </div>
    </div>
  );
}
