import { Heading, View } from "@go1d/go1d";
import { animate } from "motion";
import { useState } from "react";
import { useMemo, useRef } from "react";

function Card({ page, index, width, data }: { page: number, index: number, width: number, data: any }) {
  const cardEl = useRef(null);
  const titleEl = useRef(null);
  const [image, setImage] = useState<string|null>(null);

  const getX = useMemo(() => {
    const mod = index % 5;
    if (mod === 0) {
      return 60;
    } else if (mod === 4) {
      return -60;
    } else {
      return 0;
    }
  }, [index]);

  const renderImage = useMemo(() => {
    const inner = page * 5;
    const outer = inner + 5;
    if (index >= inner && index < outer) {
      const imageUrl = `url(${data.node.image})`;
      setImage(imageUrl);
      return imageUrl;
    }
    return null;
  }, [page, index, data]);

  const handleOnMouseOver = () => {
    animate(cardEl.current as any, { scale: 1.4, zIndex: 2, x: getX }, { duration: 0.5 });
    animate(titleEl.current as any, { opacity: 1 }, { duration: 0.1, delay: 0.1 });
  }

  const handleOnMouseLeave = () => {
    animate(cardEl.current as any, { scale: 1, zIndex: 1, x: 0 }, { duration: 0.5 });
    animate(titleEl.current as any, { opacity: 0 }, { duration: 0.1, delay: 0.3 });
  }
  
  return (
    <View
      innerRef={cardEl}
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
      justifyContent="flex-end"
      backgroundColor="faded"
      marginX={2}
      css={{
        cursor: 'pointer',
        backgroundImage: image || renderImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        maxWidth: '100%',
        minWidth: 150,
        width,
        height: 200,
      }}
    >
      <View innerRef={titleEl} zIndex={-1} backgroundColor="faint" padding={4}>
        <Heading
          color="contrast"
          visualHeadingLevel="Heading 5"
          semanticElement="h5"
          ellipsis={true}
        >
          {data.node.title}
        </Heading>
        <Heading
          color="default"
          visualHeadingLevel="Heading 6"
          semanticElement="h6"
        >
          {data.node.type}
        </Heading>
      </View>
    </View>
  )
}
export default Card;