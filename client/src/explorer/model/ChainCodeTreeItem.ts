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
'use strict';
import * as vscode from 'vscode';
import { BlockchainTreeItem } from './BlockchainTreeItem';
import { BlockchainExplorerProvider } from '../BlockchainExplorerProvider';

export class ChainCodeTreeItem extends BlockchainTreeItem {
    contextValue = 'blockchain-chaincode-item';

    constructor(provider: BlockchainExplorerProvider, private readonly name: string) {
        super(provider, name, vscode.TreeItemCollapsibleState.None);
    }
}
