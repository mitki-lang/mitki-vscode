import * as vscode from 'vscode';
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(_context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('mitki');
    const serverExecutable = config.get<string>('serverPath')!;

    const serverOptions: ServerOptions = {
        run: {
            command: serverExecutable,
            args: ['lsp'],
        },
        debug: {
            command: serverExecutable,
            args: ['lsp'],
            options: {
                env: { RUST_BACKTRACE: '1' }
            }
        }
    };

    const clientOptions: LanguageClientOptions = {
        documentSelector: [
            { scheme: 'file', language: 'mitki' }
        ]
    };

    client = new LanguageClient(
        'mitki',
        'Mitki LSP Server',
        serverOptions,
        clientOptions
    );

    client.start().catch(error => {
        vscode.window.showErrorMessage(
            `Failed to start Mitki language server: ${error.message}. ` +
            'Please check the Mitki Language Server output channel for details.'
        );
    });
}
