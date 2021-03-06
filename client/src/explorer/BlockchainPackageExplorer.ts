/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/
import * as vscode from 'vscode';
import { PackageTreeItem } from './model/PackageTreeItem';
import { BlockchainExplorerProvider } from './BlockchainExplorerProvider';
import { PackageRegistryManager } from './packages/PackageRegistryManager';
import { PackageRegistryEntry } from './packages/PackageRegistryEntry';

export class BlockchainPackageExplorerProvider implements BlockchainExplorerProvider {
    public tree: Array<PackageTreeItem> = [];
    private packageRegistryManager: PackageRegistryManager = new PackageRegistryManager();
    private _onDidChangeTreeData: vscode.EventEmitter<any | undefined> = new vscode.EventEmitter<any | undefined>();
    // tslint:disable-next-line member-ordering
    readonly onDidChangeTreeData: vscode.Event<any | undefined> = this._onDidChangeTreeData.event;

    getTreeItem(element: PackageTreeItem): vscode.TreeItem {
        console.log('BlockchainPackageExplorer: getTreeItem', element);
        return element;
    }

    async getChildren(): Promise<PackageTreeItem[]> {
        console.log('BlockchainPackageExplorer: getChildren');
        // Get the packages from the registry manager and create a package tree
        const packageArray: PackageRegistryEntry[] = await this.packageRegistryManager.getAll();
        this.tree = await this.createPackageTree(packageArray);
        return this.tree;
    }

    async refresh(): Promise<void> {
        console.log('BlockchainPackageExplorer: refresh');
        this._onDidChangeTreeData.fire();
    }

    private async createPackageTree(packageRegistryEntries: Array<PackageRegistryEntry>): Promise<PackageTreeItem[]> {
        console.log('BlockchainPackageExplorer: createPackageTree');
        const tree: Array<PackageTreeItem> = [];
        // Populate the tree with the name of each package registry entry
        for (const packageRegistryEntry of packageRegistryEntries) {
            tree.push(new PackageTreeItem(this, packageRegistryEntry.name));
        }
        return tree;
    }
}
