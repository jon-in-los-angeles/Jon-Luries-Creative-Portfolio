import { useEffect } from 'react';

export default function GeneratePWAIcons() {
  useEffect(() => {
    const generateIcon = (size: number) => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      
      // Background with rounded corners
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(0, 0, size, size);
      
      // White circle
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(size/2, size/2, size*0.375, 0, 2 * Math.PI);
      ctx.fill();
      
      // Text
      ctx.fillStyle = '#3b82f6';
      ctx.font = `bold ${Math.floor(size/3)}px system-ui, -apple-system, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('JL', size/2, size/2);
      
      // Create download link
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `icon-${size}.png`;
          link.click();
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    };

    // Generate icons automatically
    setTimeout(() => {
      generateIcon(192);
      setTimeout(() => generateIcon(512), 100);
    }, 1000);
  }, []);

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">PWA Icon Generator</h2>
      <p className="text-gray-600 mb-6">Icons will download automatically in a moment...</p>
      <div className="space-y-4">
        <button 
          onClick={() => {
            const canvas = document.createElement('canvas');
            canvas.width = 192;
            canvas.height = 192;
            const ctx = canvas.getContext('2d')!;
            
            ctx.fillStyle = '#3b82f6';
            ctx.fillRect(0, 0, 192, 192);
            
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(96, 96, 72, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.fillStyle = '#3b82f6';
            ctx.font = 'bold 64px system-ui, -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('JL', 96, 96);
            
            canvas.toBlob((blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'icon-192.png';
                link.click();
                URL.revokeObjectURL(url);
              }
            }, 'image/png');
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg mr-4"
        >
          Download 192x192 Icon
        </button>
        
        <button 
          onClick={() => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d')!;
            
            ctx.fillStyle = '#3b82f6';
            ctx.fillRect(0, 0, 512, 512);
            
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(256, 256, 192, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.fillStyle = '#3b82f6';
            ctx.font = 'bold 172px system-ui, -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('JL', 256, 256);
            
            canvas.toBlob((blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'icon-512.png';
                link.click();
                URL.revokeObjectURL(url);
              }
            }, 'image/png');
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Download 512x512 Icon
        </button>
      </div>
    </div>
  );
}