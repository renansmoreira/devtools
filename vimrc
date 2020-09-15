syntax on

call plug#begin('~/.vim/plugged')
Plug 'kien/ctrlp.vim'
Plug 'dracula/vim', { 'name': 'dracula' }
Plug 'editorconfig/editorconfig-vim'
Plug 'mileszs/ack.vim'
Plug 'pangloss/vim-javascript'
call plug#end()

" Vim-Javascript configs
let g:javascript_plugin_jsdoc = 1
let g:javascript_plugin_ngdoc = 1
let g:javascript_plugin_flow = 1

" Show line numbers
set number

" Show line numbers relative to cursor
set relativenumber

set wildignore+=*/tmp/*,*.so,*.swp,*.zip,*/target/*,*/node_modules/**
set backupcopy=yes

" Enable Highlight Search
set hlsearch

" Highlight while search
set incsearch

" Case Insensitivity Pattern Matching
set ignorecase

" Overrides ignorecase if pattern contains upcase
set smartcase

" Press <leader> Enter to remove search highlights
noremap <silent> <leader><cr> :noh<cr>

" Prevent arrow keys navigation
nnoremap <Left>  :echoe "Forget arrow keys, use h"<CR>
nnoremap <Right> :echoe "Forget arrow keys, use l"<CR>
nnoremap <Up>    :echoe "Forget arrow keys, use k"<CR>
nnoremap <Down>  :echoe "Forget arrow keys, use j"<CR>

" Toggle Relative Number
nnoremap <silent> <leader>nb :set relativenumber!<CR>

" Make j and k move to the next row, not file line
nnoremap j gj
nnoremap k gk

" Move to beginning/end of line
nnoremap B ^
nnoremap E $

" Switch between tabs
nnoremap <Leader>1 1gt
nnoremap <Leader>2 2gt
nnoremap <Leader>3 3gt
nnoremap <Leader>4 4gt
nnoremap <Leader>5 5gt
nnoremap <Leader>6 6gt
nnoremap <Leader>7 7gt
nnoremap <Leader>8 8gt
nnoremap <Leader>9 9gt

" Easily create a new tab.
noremap <Leader>tN :tabnew<CR>

" Easily close a tab.
noremap <Leader>tc :tabclose<CR>

" Easily move a tab.
noremap <Leader>tm :tabmove<CR>

" Easily go to next tab.
noremap <Leader>tn :tabnext<CR>

" Easily go to previous tab.
noremap <Leader>tp :tabprevious<CR>

let g:ctrlp_custom_ignore = '*/node_modules/*|*/target/*'
let g:ctrlp_working_path_mode = 0
