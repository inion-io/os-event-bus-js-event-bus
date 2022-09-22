import {SiCell} from "@inion/common";
import CellType from "@inion/common/dist/decorators/cellType";
import SiCellClass from "@inion/common/dist/siCell";
import EventBus from "js-event-bus";
import Action from "@inion/common/dist/messaging/decorators/action";

namespace SkUnregister {
  export const CELL_TYPE = "event-bus-unregister-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkUnregister extends SiCell<SkUnregister, void> {
  setCell(cell: SiCell<any, any>): SkUnregister;
  setEventBus(eventBus: EventBus): SkUnregister;
}

@CellType(
  SkUnregister.CELL_TYPE,
  SkUnregister.CELL_UUID
)
class SkUnregisterClass extends SiCellClass<SkUnregister, void> implements SkUnregister {

  private eventBus?: EventBus;
  private cell?: SiCell<any, any>;

  run(): SkUnregister {
    // TODO: Assertion und throw Error mit cell
    Action.Helper.getProperties(this.cell!).forEach(property => {
      if (typeof Reflect.get(this.cell!, property.propertyKey) !== "undefined") {
        this.eventBus!.detach(property.eventName, Reflect.get(this.cell!, property.propertyKey));
      }
    });

    return this.getSelf();
  }

  setCell(cell: SiCell<any, any>): SkUnregister {
    this.cell = cell;
    return this.getSelf();
  }

  setEventBus(eventBus: EventBus): SkUnregister {
    this.eventBus = eventBus;
    return this.getSelf();
  }
}

export { SkUnregister };
export default SkUnregisterClass;
