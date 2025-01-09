import { TrayIcon } from '@tauri-apps/api/tray';
import { defaultWindowIcon } from "@tauri-apps/api/app";
import { CheckMenuItem, CheckMenuItemOptions, IconMenuItem, IconMenuItemOptions, Menu, MenuItem, MenuItemOptions, PredefinedMenuItem, PredefinedMenuItemOptions, Submenu, SubmenuOptions } from '@tauri-apps/api/menu';

type Option = (MenuItem | Submenu | PredefinedMenuItem | CheckMenuItem | IconMenuItem | MenuItemOptions | SubmenuOptions | IconMenuItemOptions | PredefinedMenuItemOptions | CheckMenuItemOptions);

export async function createSystemTrayIcon(options: Option[]) {
    await TrayIcon.new({
        icon: await defaultWindowIcon() ?? undefined,
        menu: await Menu.new({ items: options }),
    });
}