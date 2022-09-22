import {SiCell} from "@inion/common";
import CellType from "@inion/common/dist/decorators/cellType";
import SiCellClass from "@inion/common/dist/siCell";
import EventBus from "js-event-bus";
import {SiEventMessage} from "@inion/common/dist/messaging/siEventMessage";

namespace SkPublish {
  export const CELL_TYPE = "event-bus-publish-skill";
  export const CELL_UUID = "9FF8DA22-9C7E-46DB-B782-1D04FC5BFD26";
}

interface SkPublish extends SiCell<SkPublish, void> {
  setMessage(message: SiEventMessage<any>): SkPublish;
  setEventBus(eventBus: EventBus): SkPublish;
}

@CellType(
  SkPublish.CELL_TYPE,
  SkPublish.CELL_UUID
)
class SkPublishClass extends SiCellClass<SkPublish, void> implements SkPublish {

  private eventBus?: EventBus;
  private message?: SiEventMessage<any>;

  run(): SkPublish {
    // TODO: Check message and eventBus for null, check message values etc.
    this.eventBus!.emit(this.message!.getEventName()!.getCellValue() as string);

    return this.getSelf();
  }

  setMessage(message: SiEventMessage<any>): SkPublish {
    this.message = message;
    return this.getSelf();
  }

  setEventBus(eventBus: EventBus): SkPublish {
    this.eventBus = eventBus;
    return this.getSelf();
  }
}

export { SkPublish };
export default SkPublishClass;
