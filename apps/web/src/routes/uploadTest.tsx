import { Button } from '@/components/ui/button';
import { useUpload } from '@/hooks/use-upload';
import { createFileRoute } from '@tanstack/react-router';
import { useState, useRef } from 'react';

export const Route = createFileRoute('/uploadTest')({
  component: RouteComponent,
});

function RouteComponent() {
  const { upload } = useUpload();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);
      // Call the upload function with the selected file
      upload(selectedFile);
    } else {
      alert('Please select a file first');
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='p-6 space-y-4'>
      <h1 className='text-2xl font-bold'>File Upload Test</h1>

      <div className='space-y-4'>
        <div className='flex items-center space-x-4'>
          <input
            ref={fileInputRef}
            type='file'
            onChange={handleFileSelect}
            className='hidden'
            accept='*/*'
          />
          <Button onClick={handleBrowseClick} variant='outline'>
            Browse Files
          </Button>
          {selectedFile && (
            <span className='text-sm text-gray-600'>
              Selected: {selectedFile.name} (
              {(selectedFile.size / 1024).toFixed(2)} KB )
            </span>
          )}
        </div>

        <Button
          onClick={handleUpload}
          disabled={!selectedFile}
          className='w-full'
        >
          {selectedFile
            ? `Upload ${selectedFile.name}`
            : 'Select a file to upload'}
        </Button>
      </div>
    </div>
  );
}
