import SiEventBusJsEventBusClass from "./siEventBusJsEventBus";
import SiEventBusJsEventBusCellAnalyzerClass from "./siEventBusJsEventBusCellAnalyzer";
import {DiscoveryModule} from "@inion/common";

export const EventBusJsEventBus: DiscoveryModule = {
  path: "@inion/event-bus-js-event-bus",
  key: "EventBusJsEventBus",
  classes: [
    SiEventBusJsEventBusClass,
    SiEventBusJsEventBusCellAnalyzerClass
  ]
}
