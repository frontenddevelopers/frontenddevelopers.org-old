# Require any additional compass plugins here.
add_import_path "app/bower_components/foundation/scss"

# Set this to the root of your project when deployed:
http_path = "app/"
http_images_dir = "app/img"
css_dir = "app/css"
sass_dir = "scss"
javascripts_dir = "app/js"

# You can select your preferred output style here (can be overridden via the command line):
output_style = :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :scss
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

if Gem.loaded_specs["sass"].version >= Gem::Version.create('3.4')
  warn "You're using Sass 3.4 or higher to compile Foundation. This version causes CSS classes to output incorrectly, so we recommend using Sass 3.3 or 3.2."
  warn "To use the right version of Sass on this project, run \"bundle\" and then use \"bundle exec compass watch\" to compile Foundation."
end
