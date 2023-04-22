import { Dynamic } from "solid-js/web";
import { PageProps } from "../page";
import { BookSpreadDeath } from "model/domain";
import { NavigationTarget, NavigationTargetType } from "components/navigation_target";
import { PageSide } from "../page_controller";
import { Component } from "solid-js";
import styles from './death_page.module.scss';

function DeathPageLeftComponent() {
  // TODO death image
  return null;
}

function DeathPageRightComponent(props: {
  navigation: (to: NavigationTarget) => void,
}) {
  return (
    <div
        class={styles.container}
        onClick={() => props.navigation({
          type: NavigationTargetType.ToC,
        })}>
      <h2>You have fallen.</h2>
    </div>
  );
}

const sideComponents: { [K in PageSide]: Component<PageProps<BookSpreadDeath>>} = {
  [PageSide.Left]: function (props: PageProps<BookSpreadDeath>) {
    return <DeathPageLeftComponent/>
  },
  [PageSide.Right]: function (props: PageProps<BookSpreadDeath>) {
    return <DeathPageRightComponent navigation={props.navigation}/>
  },
}

export function DeathPageComponent(props: PageProps<BookSpreadDeath>) {
  return (
    <Dynamic
      component={sideComponents[props.side]}
      side={props.side}
      spread={props.spread}
      navigation={props.navigation}
    />
  );

}
