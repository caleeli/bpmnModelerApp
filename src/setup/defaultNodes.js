/* Expression example */
import bpmnExtension from '@processmaker/processmaker-bpmn-moddle/resources/processmaker.json';

/* Our initial node types to register with our modeler */
import {
  association,
  endEvent,
  exclusiveGateway,
  sequenceFlow,
  startEvent,
  task,
  scriptTask,
  textAnnotation,
  pool,
  poolLane,
} from '@processmaker/modeler';

const nodeTypes = [
  startEvent,
  endEvent,
  task,
  scriptTask,
  exclusiveGateway,
  sequenceFlow,
  textAnnotation,
  association,
  pool,
  poolLane,
];
window.ProcessMaker.EventBus.$on('modeler-init', ({registerNode, registerBpmnExtension}) => {
    /* Register basic node types */
    for (const node of nodeTypes) {
        registerNode(node);
    }

    /* Add a BPMN extension */
    registerBpmnExtension('pm', bpmnExtension);
});
