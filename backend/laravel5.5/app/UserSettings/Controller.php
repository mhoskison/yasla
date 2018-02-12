<?php namespace App\UserSettings;

class Controller extends \App\Http\Controllers\Controller
{
    use \App\AuthenticatedApiRoute;

    /**
     * @var \App\UserSettings\UserSettingsModel
     */
    public $model;

    /**
     * UserSettings constructor.
     *
     * @param \App\UserSettings\UserSettingsModel $model
     */
    public function __construct(\App\UserSettings\UserSettingsModel $model = NULL)
    {
        if (!$model) $model = new \App\UserSettings\UserSettingsModel();
        $this->model = $model;
    }

    public function profile() {
        $this->ProtectController();
        $data = $this->model->profile();
        return $data;
    }

    public function set($setting_name, $setting_value)
    {
        $this->ProtectController();

        $data = $this->model->update_settings($setting_name, $setting_value);
        return $data;
    }

    public function get($setting_name) {
        $this->ProtectController();
        return $this->model->get($setting_name);
    }

    public function get_all() {
        $this->ProtectController();
        return $this->model->get_all();
    }
}