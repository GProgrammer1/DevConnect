// src/styles/nativewind-paper.ts
import { cssInterop } from "nativewind";
import {
  Text as PaperText,
  Button,
  IconButton,
  TextInput,
  Appbar,
  List,
  Surface,
  Card,
  Avatar,
  Chip,
  Badge,
  Divider,
  Switch,
  Checkbox,
  RadioButton,
  SegmentedButtons,
  HelperText,
  Snackbar,
} from "react-native-paper";

// --- Paper.Text
cssInterop(PaperText, { className: "style" });

// --- Button family
cssInterop(Button, {
  className: "style",
  contentClassName: "contentStyle",
  labelClassName: "labelStyle",
});
cssInterop(IconButton, { className: "style" });

// --- Inputs
cssInterop(TextInput, {
  className: "style",
  outlineClassName: "outlineStyle",     // outlined mode border
  underlineClassName: "underlineStyle", // flat mode underline
});

// --- Appbar (subcomponents)
const AppbarHeader = Appbar.Header;
const AppbarContent = Appbar.Content;
const AppbarAction = Appbar.Action;
const AppbarBackAction = Appbar.BackAction;

cssInterop(AppbarHeader, { className: "style" });
cssInterop(AppbarContent, {
  className: "style",
  titleClassName: "titleStyle",
  subtitleClassName: "subtitleStyle",
});
cssInterop(AppbarAction, { className: "style" });
cssInterop(AppbarBackAction, { className: "style" });

// --- List
const ListItem = List.Item;
const ListSection = List.Section;
const ListSubheader = List.Subheader;

cssInterop(ListItem, {
  className: "style",
  titleClassName: "titleStyle",
  descriptionClassName: "descriptionStyle",
});
cssInterop(ListSection, { className: "style" });
cssInterop(ListSubheader, { className: "style" });

// --- Surface
cssInterop(Surface, { className: "style" });

// --- Card + parts
const CardTitle = Card.Title;
const CardContent = Card.Content;
const CardActions = Card.Actions;

cssInterop(Card, { className: "style",
  
 });
cssInterop(CardTitle, {
  className: "style",
  titleClassName: "titleStyle",
  subtitleClassName: "subtitleStyle",
});
cssInterop(CardContent, { className: "style" });
cssInterop(CardActions, { className: "style" });

// --- Avatar
const AvatarText = Avatar.Text;
const AvatarIcon = Avatar.Icon;
const AvatarImage = Avatar.Image;

cssInterop(AvatarText, {
  className: "style",
  labelClassName: "labelStyle",
});
cssInterop(AvatarIcon, { className: "style" });
cssInterop(AvatarImage, { className: "style" });

// --- Chips / Badges / Dividers
cssInterop(Chip, {
  className: "style",
  textClassName: "textStyle",
});
cssInterop(Badge, { className: "style" });
cssInterop(Divider, { className: "style" });

// --- Toggles
cssInterop(Switch, { className: "style" });
cssInterop(Checkbox.Item, {
  className: "style",
  labelClassName: "labelStyle",
});

cssInterop(RadioButton.Item, {
  className: "style",
  labelClassName: "labelStyle",
});

// --- SegmentedButtons
cssInterop(SegmentedButtons, { className: "style" });

// --- HelperText / Snackbar
cssInterop(HelperText, { className: "style" });
cssInterop(Snackbar, { className: "style", contentClassName: "contentStyle" });
