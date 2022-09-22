import CellType from "@inion/common/dist/decorators/cellType";
import SiCellAnalyzerClass, {
  SiCellAnalyzer
} from "@inion/common/dist/discovery/analyzer/siCellAnalyzer";
import Action from "@inion/common/dist/messaging/decorators/action";
import CellReference from "@inion/common/dist/decorators/cellReference";
import SiEventBusJsEventBusClass, {SiEventBusJsEventBus} from "./siEventBusJsEventBus";
import {SiCell} from "@inion/common";

@CellType(
  SiCellAnalyzer.CELL_TYPE,
  SiCellAnalyzer.CELL_UUID,
  true
)
class SiEventBusJsEventBusCellAnalyzerClass extends SiCellAnalyzerClass implements SiCellAnalyzer {

  @CellReference(SiEventBusJsEventBusClass)
  private eventBus?: SiEventBusJsEventBus;

  run(): SiCellAnalyzer {
    if (Action.Helper.hasProperties(this.getCellValue() as SiCell<any, any>)) {
      this.eventBus?.register(this.getCellValue() as SiCell<any, any>);
    }

    return this.getSelf();
  }
}

export default SiEventBusJsEventBusCellAnalyzerClass;
