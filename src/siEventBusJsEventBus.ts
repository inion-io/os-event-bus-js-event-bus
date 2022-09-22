import {SiCell} from "@inion/common";
import {SiEventBus} from "@inion/common/dist/messaging/eventbus/siEventBus";
import CellType from "@inion/common/dist/decorators/cellType";
import SiCellClass from "@inion/common/dist/siCell";
import {SiEventMessage} from "@inion/common/dist/messaging/siEventMessage";
import EventBus from "js-event-bus";
import SkRegisterClass, {SkRegister} from "./skills/skRegister";
import Cell from "@inion/common/dist/decorators/cell";
import SkPublishClass, {SkPublish} from "./skills/skPublish";
import SkUnregisterClass, {SkUnregister} from "./skills/skUnregister";

interface SiEventBusJsEventBus extends SiEventBus<SiEventBusJsEventBus> {
}

@CellType(
  SiEventBus.CELL_TYPE,
  SiEventBus.CELL_UUID
)
class SiEventBusJsEventBusClass extends SiCellClass<SiEventBusJsEventBus, void> implements SiEventBusJsEventBus {

  private eventBus?: EventBus;
  @Cell(SkPublishClass)
  private skPublish?: SkPublish;
  @Cell(SkRegisterClass)
  private skRegister?: SkRegister;
  @Cell(SkUnregisterClass)
  private skUnregister?: SkUnregister;

  afterCreate() {
    this.eventBus = new EventBus();
  }

  publish(message: SiEventMessage<any>): void {
    try {
      this.skPublish?.createTransientInstance()
      .setMessage(message)
      .setEventBus(this.eventBus!)
      .runAndDestroy();
    } catch (error) {
      // TODO Exception Handling
      console.log("TODO: Exception Handling", error);
    }
  }

  register(cell: SiCell<any, any>): void {
    try {
      this.skRegister?.createTransientInstance()
      .setCell(cell)
      .setEventBus(this.eventBus!)
      .runAndDestroy();
    } catch (error) {
      // TODO Exception Handling
      console.log("TODO: Exception Handling", error);
    }
  }

  unregister(cell: SiCell<any, any>): void {
    try {
      this.skUnregister?.createTransientInstance()
      .setCell(cell)
      .setEventBus(this.eventBus!)
      .runAndDestroy();
    } catch (error) {
      // TODO Exception Handling
      console.log("TODO: Exception Handling", error);
    }
  }
}

export {SiEventBusJsEventBus};
export default SiEventBusJsEventBusClass;
