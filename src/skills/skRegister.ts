import {SiCell} from "@inion/common";
import CellType from "@inion/common/dist/decorators/cellType";
import SiCellClass from "@inion/common/dist/siCell";
import EventBus from "js-event-bus";
import Action from "@inion/common/dist/messaging/decorators/action";

namespace SkRegister {
  export const CELL_TYPE = "event-bus-register-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkRegister extends SiCell<SkRegister, void> {
  setCell(cell: SiCell<any, any>): SkRegister;
  setEventBus(eventBus: EventBus): SkRegister;
}

@CellType(
  SkRegister.CELL_TYPE,
  SkRegister.CELL_UUID
)
class SkRegisterClass extends SiCellClass<SkRegister, void> implements SkRegister {

  private eventBus?: EventBus;
  private cell?: SiCell<any, any>;

  run(): SkRegister {
    // TODO: Assertion und throw Error mit cell
    Action.Helper.getProperties(this.cell!).forEach(property => {
      if (typeof Reflect.get(this.cell!, property.propertyKey) !== "undefined") {
        this.eventBus!.on(property.eventName, Reflect.get(this.cell!, property.propertyKey));
      }
    });

    return this.getSelf();
  }

  setCell(cell: SiCell<any, any>): SkRegister {
    this.cell = cell;
    return this.getSelf();
  }

  setEventBus(eventBus: EventBus): SkRegister {
    this.eventBus = eventBus;
    return this.getSelf();
  }
}

export { SkRegister };
export default SkRegisterClass;
