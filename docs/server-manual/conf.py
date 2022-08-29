from xml.etree import ElementTree as ET

# Read the latest Yamcs versions from the Maven pom.xml
tree = ET.ElementTree()
tree.parse("../../pom.xml")
yamcs_version_el = tree.getroot().find("{http://maven.apache.org/POM/4.0.0}version")

project = "Yamcs"
copyright = "2006-present, Space Applications Services"
author = "Yamcs Team"

# The short X.Y version
version = yamcs_version_el.text

# The full version, including alpha/beta/rc tags
release = version

extensions = [
    "sphinx.ext.autodoc",
    "sphinx.ext.doctest",
    "sphinx.ext.extlinks",
    "sphinxcontrib.fulltoc",
    "sphinxcontrib.yamcs",
]

# Add any paths that contain templates here, relative to this directory.
# templates_path = ['_templates']

# The suffix(es) of source filenames.
# You can specify multiple suffix as a list of string:
#
# source_suffix = ['.rst', '.md']
source_suffix = ".rst"

# The language for content autogenerated by Sphinx. Refer to documentation
# for a list of supported languages.
#
# This is also used if you do content translation via gettext catalogs.
# Usually you set "language" from the command line for these cases.
language = None

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path .
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

# The name of the Pygments (syntax highlighting) style to use.
pygments_style = "sphinx"

extlinks = {
    "source": ("https://github.com/yamcs/yamcs/blob/master/%s", ""),
    "apidoc": ("https://docs.yamcs.org/yamcs-http-api/%s", ""),
}

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = "nature"

# Theme options are theme-specific and customize the look and feel of a theme
# further.  For a list of options available for each theme, see the
# documentation.
#
html_theme_options = {
    "sidebarwidth": "300px",
}

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
# html_static_path = ['_static']

html_show_sourcelink = False

latex_elements = {
    "papersize": "a4paper",
    "figure_align": "htbp",
}

# Grouping the document tree into LaTeX files. List of tuples
# (source start file, target name, title,
#  author, documentclass [howto, manual, or own class]).
latex_documents = [
    (
        "index",
        "yamcs-server-manual.tex",
        "Yamcs Server Manual",
        "Space Applications Services",
        "manual",
    ),
]

latex_show_pagerefs = True

latex_show_urls = "footnote"

man_pages = [
    (
        "programs/yamcsadmin",
        "yamcsadmin",
        "Tool for local Yamcs administration",
        author,
        1,
    ),
    (
        "programs/yamcsadmin_backup",
        "yamcsadmin-backup",
        "Perform and restore backups",
        author,
        1,
    ),
    (
        "programs/yamcsadmin_confcheck",
        "yamcsadmin-confcheck",
        "Check Yamcs configuration",
        author,
        1,
    ),
    (
        "programs/yamcsadmin_mdb",
        "yamcsadmin-mdb",
        "Provides MDB information",
        author,
        1,
    ),
    (
        "programs/yamcsadmin_parchive",
        "yamcsadmin-parchive",
        "Parameter Archive operations",
        author,
        1,
    ),
    (
        "programs/yamcsadmin_password-hash",
        "yamcsadmin-password-hash",
        "Generate password hash for use in users.yaml",
        author,
        1,
    ),
    (
        "programs/yamcsadmin_rocksdb",
        "yamcsadmin-rocksdb",
        "Provides low-level RocksDB data operations",
        author,
        1,
    ),
    (
        "programs/yamcsadmin_users",
        "yamcsadmin-users",
        "User operations",
        author,
        1,
    ),
    ("programs/yamcsd", "yamcsd", "Yamcs Server", author, 1),
]
