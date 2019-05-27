# -*- coding: utf-8 -*-
#
# Configuration file for the Sphinx documentation builder.
#
# This file does only contain a selection of the most common options. For a
# full list see the documentation:
# http://www.sphinx-doc.org/en/master/config

import os
import sys

import pkg_resources

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
sys.path.insert(0, os.path.abspath('_ext'))

project = u'Yamcs Server'
copyright = u'2019, Space Applications Services'
author = u'Yamcs Team'

# The short X.Y version
version = u''

# The full version, including alpha/beta/rc tags
release = version

extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.doctest',
    'sphinx.ext.extlinks',
    'sphinxcontrib.fulltoc',
    'javadoc',
]

# Add any paths that contain templates here, relative to this directory.
#templates_path = ['_templates']

# The suffix(es) of source filenames.
# You can specify multiple suffix as a list of string:
#
# source_suffix = ['.rst', '.md']
source_suffix = '.rst'

# The language for content autogenerated by Sphinx. Refer to documentation
# for a list of supported languages.
#
# This is also used if you do content translation via gettext catalogs.
# Usually you set "language" from the command line for these cases.
language = None

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path .
exclude_patterns = [u'_build', 'Thumbs.db', '.DS_Store']

# The name of the Pygments (syntax highlighting) style to use.
pygments_style = 'sphinx'

extlinks = {
    'source': ('https://github.com/yamcs/yamcs/blob/master/%s', ''),
}

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = 'alabaster'

# Theme options are theme-specific and customize the look and feel of a theme
# further.  For a list of options available for each theme, see the
# documentation.
#
html_theme_options = {
    #'description': 'Yamcs Server',
    'fixed_sidebar': False,
    'show_powered_by': False,
    'font_family': 'Helvetica,Arial,sans-serif',
    'font_size': '15px',
}

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
#html_static_path = ['_static']

html_show_sourcelink = False

latex_elements = {
    # The paper size ('letterpaper' or 'a4paper').
    #
    'papersize': 'a4paper',

    # The font size ('10pt', '11pt' or '12pt').
    #
    # 'pointsize': '10pt',

    # Additional stuff for the LaTeX preamble.
    #
    'preamble': '\setcounter{tocdepth}{2}',

    # Latex figure (float) alignment
    #
    'figure_align': 'htbp',
}

# Grouping the document tree into LaTeX files. List of tuples
# (source start file, target name, title,
#  author, documentclass [howto, manual, or own class]).
latex_documents = [
    ('user-guide/index', 'user-guide.tex', 'Yamcs User Guide', 'Space Applications Services', 'manual'),
    ('http-api/index', 'yamcs-http-api.tex', 'Yamcs HTTP API', 'Space Applications Services', 'manual'),
]

latex_show_pagerefs = True

latex_show_urls = 'footnote'
