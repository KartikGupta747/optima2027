import React, { useEffect, useState } from 'react';
import '../OptimaCss/Gallery.css'; 
const CollageGallery = ({ images }) => {
  const [rows, setRows] = useState([]);
  
  // Calculate aspect ratio for an image (width / height)
  const getAspectRatio = (image) => {
    const img = new Image();
    img.src = typeof image === 'string' ? image : image.src;
    // Default to 16:9 if image dimensions aren't available
    return img.width && img.height ? img.width / img.height : 16/9;
  };

  // Constrain aspect ratio between 3:2 and 16:9
  const constrainAspectRatio = (ratio) => {
    const minRatio = 3/2; // 1.5
    const maxRatio = 16/9; // ~1.78
    return Math.max(minRatio, Math.min(maxRatio, ratio));
  };

  // Group images into rows
  const organizeIntoRows = () => {
    const targetRowHeight = window.innerWidth > 768 ? 300 : 200;
    const containerWidth = document.querySelector('.CollageGallery-container')?.clientWidth || window.innerWidth;
    const gap = 6; // Gap between images
    
    let currentRow = [];
    let currentRowWidth = 0;
    const newRows = [];
    
    images.forEach((image, index) => {
      const ratio = constrainAspectRatio(getAspectRatio(image));
      const imageWidth = targetRowHeight * ratio;
      
      if (currentRowWidth + imageWidth > containerWidth && currentRow.length > 0) {
        // Scale row height to fit container width perfectly
        const scale = (containerWidth - (currentRow.length - 1) * gap) / currentRowWidth;
        const rowHeight = targetRowHeight * scale;
        
        newRows.push({
          images: currentRow,
          height: rowHeight
        });
        
        currentRow = [];
        currentRowWidth = 0;
      }
      
      currentRow.push({
        image,
        ratio,
        width: imageWidth
      });
      currentRowWidth += imageWidth + gap;
      
      // Handle last row
      if (index === images.length - 1 && currentRow.length > 0) {
        const scale = (containerWidth - (currentRow.length - 1) * gap) / currentRowWidth;
        const rowHeight = targetRowHeight * scale;
        newRows.push({
          images: currentRow,
          height: rowHeight
        });
      }
    });
    
    setRows(newRows);
  };

  useEffect(() => {
    organizeIntoRows();
    window.addEventListener('resize', organizeIntoRows);
    return () => window.removeEventListener('resize', organizeIntoRows);
  }, [images]);

  return (
    <div className="CollageGallery-container">
      {rows.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className="CollageGallery-row"
          style={{ height: row.height }}
        >
          {row.images.map((item, imageIndex) => (
            <div
              key={`${rowIndex}-${imageIndex}`}
              className="CollageGallery-item"
              style={{
                width: `${(item.ratio * row.height)}px`,
                flexGrow: item.ratio
              }}
            >
              <img
                src={typeof item.image === 'string' ? item.image : item.image.src}
                alt={typeof item.image === 'string' ? `Gallery image ${imageIndex + 1}` : item.image.alt || `Gallery image ${imageIndex + 1}`}
                className="CollageGallery-img"
                loading="lazy"
              />
              <div className="CollageGallery-shine" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CollageGallery;