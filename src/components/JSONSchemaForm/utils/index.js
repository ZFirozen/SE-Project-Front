import {
  SchemaField,
  ObjectField,
  StringField,
  ArrayField,
} from "../Fields";
import {
  StringInputWidget,
  CheckboxWidget,
  RadioWidget,
  TextareaWidget,
  ArrayTableWidget
} from "../Widgets";

export function getRegister() {
  return {
    field: {
      SchemaField,
      ObjectField,
      StringField,
      ArrayField,
    },
    widget: {
      StringInputWidget,
      CheckboxWidget,
      RadioWidget,
      TextareaWidget,
      ArrayTableWidget
    }
  }
}

export function setDataToPath(obj, path = "root", value) {
  console.log(obj, path, value);
  const paths = path.split(".");
  if (paths.length === 1) return value;
  obj = obj ? obj : {};
  let temp = obj;
  const len = paths.length;
  for (let i = 1; i < len; i++) {
    let key = paths[i];
    if ((len - 1) === i) temp[key] = value;
    else {
      if (key in temp) temp = temp[key];
      else {
        temp[key] = {};
        temp = temp[key];
      }
    }
  }
  return obj;
}

export function getDefaultTitle(path = "root") {
  const paths = path.split(".");
  return paths[paths.length - 1];
}

export function getFontSize(path) {
  const paths = path.split(".");
  const len = paths.length - 1;
  const size = 35 - len * 5;
  return size >= 16 ? size : 16;
}