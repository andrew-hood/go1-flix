import { ButtonMinimal, Heading, View } from "@go1d/go1d";
import IconCaretLeft from "@go1d/go1d/build/components/Icons/CaretLeft";
import IconCaretRight from "@go1d/go1d/build/components/Icons/CaretRight";
import { animate } from "motion";
import { useEffect, useRef, useState } from "react";
import Card from "./Card";

function Topic({ title, cards = [] }: {title: string, cards: any[]}) {
  const element = useRef(null);
  const left = useRef(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [page, setPage] = useState(0);
  
  useEffect(() => {
    setCardWidth(((element.current as any).clientWidth - 50) / 5);
  }, [element]);

  const handleRightOnClick = () => {
    left.current -= ((element.current as any).clientWidth - 10);
    animate(element.current as any, { x: left.current }, { duration: 0.8 });
    setPage(page + 1);
  }

  const handleLeftOnClick = () => {
    left.current += ((element.current as any).clientWidth - 10);
    animate(element.current as any, { x: left.current }, { duration: 0.8 });
    setPage(page - 1);
  }

  return (
    <View marginY={6}>
      <View flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom={6}>
        <Heading color="contrast" visualHeadingLevel="Heading 3" semanticElement="h3">{title}</Heading>
        <View flexDirection="row">
          <ButtonMinimal onClick={handleLeftOnClick} icon={IconCaretLeft} disabled={page === 0} />
          <ButtonMinimal onClick={handleRightOnClick} icon={IconCaretRight} disabled={page === 2} />
        </View>
      </View>
      <View flexDirection="row" innerRef={element}>
        {cards.map((card, index) => <Card index={index} page={page} width={cardWidth} data={card} />)}
      </View>
    </View>
  );
}
export default Topic;