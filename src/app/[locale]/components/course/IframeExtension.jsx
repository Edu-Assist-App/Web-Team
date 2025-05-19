const Iframe = Extension.create({
    name: 'iframe',
  
    addOptions() {
      return {
        allowFullscreen: true,
        frameborder: 0,
      };
    },
  
    addAttributes() {
      return {
        src: {
          default: null,
          parseHTML: element => element.getAttribute('src'),
          renderHTML: attributes => ({ src: attributes.src }),
        },
        width: {
          default: '560',
          parseHTML: element => element.getAttribute('width'),
          renderHTML: attributes => ({ width: attributes.width }),
        },
        height: {
          default: '315',
          parseHTML: element => element.getAttribute('height'),
          renderHTML: attributes => ({ height: attributes.height }),
        },
        frameborder: {
          default: 0,
          parseHTML: element => element.getAttribute('frameborder'),
          renderHTML: attributes => ({ frameborder: attributes.frameborder }),
        },
        allowfullscreen: {
          default: true,
          parseHTML: element => element.getAttribute('allowfullscreen') !== null,
          renderHTML: attributes => attributes.allowfullscreen ? { allowfullscreen: '' } : {},
        },
      };
    },
  
    parseHTML() {
      return [
        {
          tag: 'iframe',
        },
      ];
    },
  
    renderHTML({ node }) {
      return ['iframe', node.attrs, 0];
    },
  
    addNodeView() {
      return ({ node }) => {
        const iframe = document.createElement('iframe');
        iframe.src = node.attrs.src;
        iframe.width = node.attrs.width;
        iframe.height = node.attrs.height;
        iframe.frameBorder = node.attrs.frameborder;
        if (node.attrs.allowfullscreen) iframe.setAttribute('allowfullscreen', '');
        iframe.style.pointerEvents = 'none'; // Prevent interaction in edit mode
        return { dom: iframe };
      };
    },
  });
  
  // Ensure this is included in your editor's extensions array
  export default Iframe;