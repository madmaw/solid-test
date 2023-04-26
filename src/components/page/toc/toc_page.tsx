import { BookSpreadTableOfContents } from "model/domain";
import { PageProps } from "../page";
import { PageSide } from "../page_controller";
import { Component } from "solid-js";
import { Dynamic } from "solid-js/web";
import styles from './page_toc.module.scss';
import { NavigationTargetType } from "components/navigation_target";
import { CardFaceComponent } from "components/card/face/card_face";
import { cardBackForceEager, cardFrontForceEager } from "data/items/force";
import { DamageUp, Force } from "data/effects";
import { cardBackKick, cardFrontKick } from "data/items/kick";

type PageToCProps = PageProps<BookSpreadTableOfContents>;

function ToCEntryComponent(props: PageToCProps & {
  targetChapter: number,
  name: string,
}) {
  return (
    <li classList={{
      [styles.disabled]: props.spread.unlockedChapters < props.targetChapter
    }}>
      <a href="#"
          onClick={() => props.navigation({
            type: NavigationTargetType.Chapter,
            chapterIndex: props.targetChapter,
          })}
          onFocus={() => props.onFocusUIElement(props.targetChapter)}
          onMouseOver={() => props.onFocusUIElement(props.targetChapter)}
      >{props.name}</a>
    </li>
  );
}

function ToCPageLeftComponent() {
  return (
    <div class={styles.left}>
      <div class={styles.instructions}>
        <p>
          MY NOTES
        </p>
        <p>
          I found this old book, but I couldn't find anything explaining what it does. 
        </p>
        <p>
          Resource card? Automatically flips?
        </p>
        <div class={styles.row} style={{
          transform: 'rotate(-3deg)',
        }}>
          <div>
            Back<br/>
            <div class={styles.card}>
              <CardFaceComponent
                  benefit={[]}
                  cost={[]}
                  choice={false}
                  face={cardBackForceEager}
                  recyclePosition={undefined}
                  warning={false}
              />
            </div>
          </div>
          <div>
            Front<br/>
            <div class={styles.card}>
              <CardFaceComponent
                  benefit={[{
                    effect: Force,
                    used: false,
                  }, {
                    effect: Force,
                    used: false,
                  }]}
                  cost={[]}
                  choice={false}
                  face={cardFrontForceEager}
                  recyclePosition={1}
                  warning={false}
              />
            </div>
            * I think the number on the bottom is where it gets shuffled in the deck??
          </div>
        </div>
        <p>
          Can be dragged onto cards like this (note the matching symbols) to flip them.
          You can't move unflipped cards.
        </p>
        <b>WARNING</b>: this icon ↓ can HURT if it's pointed at you!!

        <div class={styles.row} style={{
          transform: 'rotate(3deg)'
        }}>
          <div class={styles.card}>
            <CardFaceComponent
                benefit={[]}
                cost={[{
                  effect: Force,
                  used: false
                }]}
                choice={false}
                face={cardBackKick}
                recyclePosition={undefined}
                warning={false}
            />
          </div>
          <div>
            <div class={styles.card}>
              <CardFaceComponent
                  benefit={[{
                    effect: DamageUp,
                    used: false
                  }]}
                  cost={[]}
                  choice={false}
                  face={cardFrontKick}
                  recyclePosition={5}
                  warning={false}
              />
            </div>
          </div>
          <div style={{
            ['padding-top']: '2vmin',
            transform: 'rotate(-4deg)',
            ['text-align']: 'center',
          }}>
            Does reading the book<br/>make you older?
          </div>
        </div>
      </div>
      <div class={styles.credits}>
        <p>
          <b>A game by</b><br/>
          <a href="https://itch.io/profile/hightowerbk" target="_blank">HighTowerBK</a> (audio)<br/>
          hello@<a href="https://uki.dev/" target="_blank">uki.dev</a> (programming)<br/>
          <a href="https://twitter.com/mad_maw" target="_blank">@mad_maw</a> (programming, game design)
        </p>
      </div>
    </div >  
  );
}

function ToCPageRightComponent(props: PageToCProps) {
  return (
    <div class={styles.toc}>
      <h2>
        Table of Contents
      </h2>
      <ol>
        <ToCEntryComponent targetChapter={0} name="Tutorial" {...props}/>
        <li>&nbsp;</li>
        <ToCEntryComponent targetChapter={1} name="Prologue" {...props}/>
        <ToCEntryComponent targetChapter={3} name="The Road" {...props}/>
        <ToCEntryComponent targetChapter={4} name="The Ruins" {...props}/>
        <ToCEntryComponent targetChapter={5} name="The Tower" {...props}/>
      </ol>
    </div >  
  );
}

const sideComponents: { [K in PageSide]: Component<PageToCProps>} = {
  [PageSide.Left]: function () {
    return (
        <ToCPageLeftComponent
        />
    );
  },
  [PageSide.Right]: function (props: PageToCProps) {
    return <ToCPageRightComponent
        side={props.side}
        spread={props.spread}
        navigation={props.navigation}
        onFocusUIElement={props.onFocusUIElement}/>
  },
}


export function ToCPageComponent(props: PageToCProps) {
  return (
    <Dynamic
      component={sideComponents[props.side]}
      side={props.side}
      spread={props.spread}
      navigation={props.navigation}
      onFocusUIElement={props.onFocusUIElement}
    />
  );
}

/*
      <p>
        Once upon a time there was a poor, old man who heard of a great and terrible book.
      </p>
      <p>
        It was said just reading this book could make you rich, young, and powerful.
      </p>
      <p>
        It could also kill you.
      </p>
      <p>
        (turn page?)
      </p>
*/
